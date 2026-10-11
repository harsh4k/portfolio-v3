import type * as ThreeModule from "three";
import { makeLabel, type SceneBuilder } from "./stage";

/**
 * Helix Dive: a corkscrew. The camera circles a wire spiral staircase while
 * dropping down it, looking down the axis. Each stage of the work gets a
 * marked step, and the camera has it centred while that stage's text shows.
 */

/** Steps between two stages. */
const PER_STAGE = 8;
/** Height and angle from one step to the next. */
const DROP = 0.32;
const TURN = Math.PI / 6;
/** How far below the camera it looks, in world units. */
const LOOK_DOWN = 2.2;

export const buildHelix: SceneBuilder = ({ three, scene, camera, section, palette, compact }) => {
  const materials: ThreeModule.LineBasicMaterial[] = [];
  const line = (opacity: number) => {
    const material = new three.LineBasicMaterial({ color: palette.wire, transparent: opacity < 1, opacity });
    materials.push(material);
    return material;
  };

  const marks = [...section.querySelectorAll<HTMLElement>(".js-s3d-step .s3d__mark")].map(
    (el) => el.textContent?.trim() ?? "",
  );
  const total = marks.length * PER_STAGE + 6;

  const core = new three.LineSegments(
    new three.EdgesGeometry(new three.CylinderGeometry(0.4, 0.4, total * DROP + 8, 12, 1, true)),
    line(0.5),
  );
  core.position.y = (-total * DROP) / 2;
  scene.add(core);

  const stepGeometry = new three.EdgesGeometry(new three.BoxGeometry(2.4, 0.08, 0.7));
  const plain = line(0.55);
  const marked = line(1);
  const handrail: ThreeModule.Vector3[] = [];
  const labels: ReturnType<typeof makeLabel>[] = [];
  for (let i = -6; i < total; i++) {
    const angle = i * TURN;
    const y = -i * DROP;
    const isStage = i >= 0 && i % PER_STAGE === 0 && i / PER_STAGE < marks.length;
    const step = new three.LineSegments(stepGeometry, isStage ? marked : plain);
    step.position.set(Math.cos(angle) * 1.6, y, -Math.sin(angle) * 1.6);
    step.rotation.y = angle;
    scene.add(step);
    handrail.push(new three.Vector3(Math.cos(angle) * 2.8, y + 0.9, -Math.sin(angle) * 2.8));
    if (isStage) {
      const label = makeLabel(three, (marks[i / PER_STAGE] ?? "").toUpperCase(), 0.75);
      label.sprite.position.set(Math.cos(angle) * 1.6, y + 0.5, -Math.sin(angle) * 1.6);
      scene.add(label.sprite);
      labels.push(label);
    }
  }
  const rail = new three.BufferGeometry().setFromPoints(
    new three.CatmullRomCurve3(handrail).getPoints(handrail.length * 8),
  );
  scene.add(new three.Line(rail, line(0.8)));

  const radius = compact ? 6 : 5.2;

  return {
    update(progress) {
      // Stage i is centred in view at the middle of its slice of the scroll.
      const k = (progress * marks.length - 0.5) * PER_STAGE + 0.6;
      const angle = k * TURN + 0.9;
      const y = -k * DROP + LOOK_DOWN + 0.2;
      camera.position.set(Math.cos(angle) * radius, y, -Math.sin(angle) * radius);
      camera.lookAt(0, y - LOOK_DOWN, 0);
    },
    recolor(next) {
      materials.forEach((material) => material.color.set(next.wire));
      labels.forEach((label) => label.setColor(next.wire));
    },
  };
};
