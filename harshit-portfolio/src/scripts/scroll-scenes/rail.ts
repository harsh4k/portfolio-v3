import type * as ThreeModule from "three";
import { makeLabel, type SceneBuilder } from "./stage";

/**
 * Build Rail: a tracking shot. The camera rides a curved track low over a
 * wire landscape and passes through a gate for each milestone, looking ahead
 * and banking into the curves.
 */

/** The landscape's height at a point, gentle enough for the track to sit on. */
const ground = (x: number, z: number) =>
  Math.sin(x * 0.17) * Math.cos(z * 0.11) * 1.4 + Math.sin(z * 0.05 + x * 0.07) * 0.8;

/** The track's centre line, from the start (z = 12) into the distance. */
const PATH: [number, number][] = [
  [0, 12],
  [5, -6],
  [-5, -24],
  [6, -44],
  [-4, -64],
  [5, -84],
  [-2, -104],
  [0, -116],
];

/** Where along the track the camera starts and stops, as a fraction of its length. */
const RIDE_START = 0.02;
const RIDE_END = 0.9;
/** The most the camera rolls into a curve, in radians. */
const MAX_BANK = 0.12;

export const buildRail: SceneBuilder = ({ three, scene, camera, section, palette, compact }) => {
  const materials: ThreeModule.LineBasicMaterial[] = [];
  const line = (opacity: number) => {
    const material = new three.LineBasicMaterial({ color: palette.wire, transparent: opacity < 1, opacity });
    materials.push(material);
    return material;
  };

  // The landscape: a grid of lines along x and z that follows the ground, no diagonals.
  const step = compact ? 3 : 2;
  const grid: number[] = [];
  for (let x = -42; x <= 42; x += step) {
    for (let z = -130; z < 24; z += step) grid.push(x, ground(x, z), z, x, ground(x, z + step), z + step);
  }
  for (let z = -130; z <= 24; z += step) {
    for (let x = -42; x < 42; x += step) grid.push(x, ground(x, z), z, x + step, ground(x + step, z), z);
  }
  const landscape = new three.BufferGeometry();
  landscape.setAttribute("position", new three.Float32BufferAttribute(grid, 3));
  scene.add(new three.LineSegments(landscape, line(0.32)));

  // The track: two rails and sleepers, raised a little off the ground.
  const curve = new three.CatmullRomCurve3(PATH.map(([x, z]) => new three.Vector3(x, ground(x, z) + 0.35, z)));
  const rails: number[] = [];
  const sleepers: number[] = [];
  const samples = 600;
  const side = new three.Vector3();
  const up = new three.Vector3(0, 1, 0);
  let previous: [ThreeModule.Vector3, ThreeModule.Vector3] | undefined;
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const at = curve.getPointAt(u);
    side.crossVectors(curve.getTangentAt(u), up).normalize().multiplyScalar(0.55);
    const left = at.clone().add(side);
    const right = at.clone().sub(side);
    if (previous) rails.push(...previous[0].toArray(), ...left.toArray(), ...previous[1].toArray(), ...right.toArray());
    if (i % 4 === 0)
      sleepers.push(
        ...left.clone().addScaledVector(side, 0.4).toArray(),
        ...right.clone().addScaledVector(side, -0.4).toArray(),
      );
    previous = [left, right];
  }
  const railGeometry = new three.BufferGeometry();
  railGeometry.setAttribute("position", new three.Float32BufferAttribute(rails, 3));
  scene.add(new three.LineSegments(railGeometry, line(1)));
  const sleeperGeometry = new three.BufferGeometry();
  sleeperGeometry.setAttribute("position", new three.Float32BufferAttribute(sleepers, 3));
  scene.add(new three.LineSegments(sleeperGeometry, line(0.6)));

  // A gate per milestone, placed so the camera passes it near the end of that milestone's slice of the scroll.
  const marks = [...section.querySelectorAll<HTMLElement>(".js-s3d-step .s3d__mark")].map(
    (el) => el.textContent?.trim() ?? "",
  );
  const labels = marks.map((text, index) => {
    const progress = (index + 0.8) / marks.length;
    const u = RIDE_START + (RIDE_END - RIDE_START) * progress;
    const at = curve.getPointAt(u);
    const gate = new three.LineSegments(new three.EdgesGeometry(new three.BoxGeometry(3.6, 3, 0.25)), line(1));
    gate.position.set(at.x, at.y + 1.3, at.z);
    gate.lookAt(
      at
        .clone()
        .add(curve.getTangentAt(u))
        .setY(at.y + 1.3),
    );
    scene.add(gate);
    const label = makeLabel(three, text.toUpperCase(), 0.9);
    label.sprite.position.set(at.x, at.y + 3.5, at.z);
    scene.add(label.sprite);
    return label;
  });

  const ahead = new three.Vector3();
  const tangentNow = new three.Vector3();
  const tangentNext = new three.Vector3();

  return {
    update(progress) {
      const u = RIDE_START + (RIDE_END - RIDE_START) * progress;
      const at = curve.getPointAt(u);
      const next = Math.min(1, u + 0.03);
      curve.getPointAt(next, ahead);
      camera.position.set(at.x, at.y + 1.1, at.z);
      camera.lookAt(ahead.x, ahead.y + 0.9, ahead.z);
      // Bank into the curve: the turn between here and a little ahead, as a gentle roll.
      curve.getTangentAt(u, tangentNow);
      curve.getTangentAt(next, tangentNext);
      const turn = tangentNow.x * tangentNext.z - tangentNow.z * tangentNext.x;
      camera.rotateZ(Math.max(-MAX_BANK, Math.min(MAX_BANK, turn * 0.5)));
    },
    recolor(next) {
      materials.forEach((material) => material.color.set(next.wire));
      labels.forEach((label) => label.setColor(next.wire));
    },
  };
};
