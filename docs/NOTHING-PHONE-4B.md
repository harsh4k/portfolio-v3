# Nothing Phone (4b) — what is actually possible

Verified against:

- [Nothing Glyph Developer Kit README](https://github.com/Nothing-Developer-Programme/Glyph-Developer-Kit) (Phone (4b) = `is25131()` / `DEVICE_25131`, channels **A1–A4**)
- Android App Widgets and Trusted Web Activity documentation
- Nothing OS 3 lock-screen customization (user-facing widget picker, not a public third-party lock-screen webpage API)

This file is the source of truth. Nothing in the repo pretends a website can be the lock screen wallpaper or a live WebView on the keyguard.

---

## 1. What is actually possible on Phone (4b)

| Goal | Possible? | How |
| --- | --- | --- |
| Keep the existing site as the experience | Yes | PWA + optional TWA loads `https://harshitchauhan.dev/` |
| Install as an app (no browser chrome) | Yes | Chrome **Add to Home screen** / PWA, or Android TWA after Digital Asset Links |
| Put the **website itself** on the lock screen | **No** | Android and Nothing OS do not let arbitrary sites run as lock-screen content |
| One tap from lock screen toward the site | **Maybe** | If Nothing’s lock-screen widget picker lists the Android widget; otherwise home-screen widget / app icon |
| Glyph LEDs from this website | **No** | Glyph SDK is **native Android**, **foreground app only** |
| Glyph LEDs from a native app on 4b | **Yes, limited** | Official GDK: 4 segments, toggle / breathing `animate`, period / cycles / interval |
| Custom Glyph Matrix toys (Phone 3 style) | **No on 4b** | 4b is a 4-segment **Glyph Bar**, not a Glyph Matrix |
| Per-LED brightness API | **Not documented** | GDK exposes on/off frames and a breathing `animate`, not a brightness channel |
| `displayProgress` on 4b | **Unlikely / undocumented for A1–A4** | README limits progress to **C1 / D1** (other models) |

---

## 2. What Android permits

- **PWA / TWA:** fullscreen-ish `display: standalone` or Trusted Web Activity. Still a web origin. Unlock is required to launch an activity from a locked device unless a lock-screen widget host starts it (and even then Keyguard typically authenticates).
- **App shortcuts:** long-press icon → About / Work / Contact (`/#about`, `/#work`, `/#contact`).
- **App widgets:** `AppWidgetProvider` on the **home screen**. AOSP removed lock-screen widgets as a first-class category after Android 12 (`keyguard` is legacy).
- **Notifications:** a website can use Web Push only with a backend VAPID setup (not implemented). A native app could post a notification with an action that opens the TWA — that is not lock-screen HTML, and we did not add notification spam.
- **No official API** for “this WebView is my lock screen.”

---

## 3. What Nothing OS permits

- **Lock screen customization** (Nothing OS 3+): clock styles and **widgets**, including a library that can show **third-party widgets**. That is a **picker**, not a promise that every `AppWidgetProvider` is allowed, and not a Nothing-branded “Glance” SDK for third parties.
- **First-party Nothing widgets** (clock, quotes, etc.) use a **private** `com.nothing.cardservice` stack. Reverse-engineering that is unofficial and unstable. This project does **not** use it.
- **Glyph Developer Kit** (official): `com.nothing.ketchum`, permission `com.nothing.ketchum.permission.ENABLE`, `GlyphManager` session, **foreground applications only**. Phone (4b) channels **A1–A4** (array index `0–3`). `register(Glyph.DEVICE_25131)` when `Common.is25131()`. API key: README still recommends `NothingKey`; restriction removed on Android 16+, debug can use `test` + `adb shell settings put global nt_glyph_interface_debug_enable 1` (auto-off after 48 hours).
- Glyph **cannot** launch the portfolio from the lock screen. It only drives LEDs while a native app is in the foreground.

---

## 4. What cannot be done

- Embed `harshitchauhan.dev` as the lock screen.
- A PWA “lock screen widget.”
- Claiming a normal Android widget is a first-party Nothing lock-screen widget.
- Shipping Glyph animations from JavaScript.
- Custom per-pixel Glyph sequences on 4b (there is no matrix).
- Third-party lock-screen-only widgets via a documented Nothing API.

---

## 5. Steps on the Phone (4b)

### A. Fastest path (recommended): install the PWA

1. Open **Chrome** (not a Mini window).
2. Go to `https://harshitchauhan.dev/`.
3. Menu **⋮ → Add to Home screen** / **Install app**.
4. Open **Harshit** from the home screen. It should run **standalone** (no Chrome tab UI).
5. Optional: long-press the icon → **About / Work / Contact** (manifest shortcuts, Chrome-dependent).

Closest lock-screen UX without a native APK:

- Unlock with fingerprint/face (Nothing is fast).
- Tap **Harshit** on the home screen (put the icon in the dock / first page).

### B. Optional: Android APK (widget + shortcuts)

1. Enable **Install unknown apps** for Files if sideloading.
2. Install the debug/release APK from `android/` (see `android/README.md`).
3. Open **Harshit** once so Chrome can bind the TWA.
4. Long-press the icon → shortcuts.
5. Long-press home screen → **Widgets** → **Harshit portfolio**.
6. Lock screen (if available on your OS build): long-press lock screen → **Customize lock screen** → **Widgets** → look for the same widget under third-party. If it is not listed, Android/Nothing is filtering it — use the home-screen widget.

### C. Digital Asset Links (remove TWA URL bar)

After you have a signing cert SHA-256, put it in `harshit-portfolio/public/.well-known/assetlinks.json` and deploy. Until then Chrome may show a small address bar. That is expected.

---

## 6. How to install / test the Android build

```text
Open android/ in Android Studio → connect Phone (4b) with USB debugging
→ Run app
```

Or:

```powershell
cd android
.\gradlew.bat :app:installDebug
```

The activity is a **Trusted Web Activity** pointed at `https://harshitchauhan.dev/`. Local `127.0.0.1` will not work inside the TWA (HTTPS + asset links). Test the PWA against `http://127.0.0.1:4175/` in Chrome instead.

---

## 7. How to install the website as a PWA

Same as §5A. Requirements Chrome checks:

- HTTPS (or localhost)
- Valid `site.webmanifest` (`display: standalone`, 192 + 512 icons)
- A registered service worker (`/sw.js`)
- A visitable `start_url`

The old service worker **unregistered itself** and cleared caches. That is gone. After deploy, hard-refresh once.

---

## 8. Closest thing to LOCK SCREEN → ONE TAP → SITE

**Best reliable:** home-screen dock icon (PWA or APK).

**Best experimental on Nothing OS 3+:** lock-screen **third-party widget** that opens the TWA. Still typically requires unlocking. It is **not** a live website on the keyguard.

**Not viable:** Glyph as a launcher; Web Push as a lock-screen browser.

---

## 9. Permissions

| Surface | Permission |
| --- | --- |
| PWA | None beyond Chrome install |
| Android TWA | `INTERNET` only |
| Widget | None extra |
| Glyph (not shipped) | `com.nothing.ketchum.permission.ENABLE`; session APIs; foreground only |
| Notifications | Not requested |

---

## 10. Limitations

- The first visit needs a network. After it, the worker holds the whole site — 3D intro, GSAP engine, fonts, images, WebGL textures, video and the resume — so later launches run with no connection at all. `/offline.html` is now only the fallback for an install interrupted before the document was stored.
- Hash routes (`/#work`) work after the document loads; the existing intro still runs first.
- TWA without asset links looks almost like Chrome Custom Tabs.
- Widget on lock screen is **OS-dependent**, not guaranteed.
- Glyph is documented, not implemented, so we do not ship a fake LED show.

---

## Project layout

```text
harshit-portfolio/     # website + PWA (do not rewrite)
web/README.md          # pointer to the PWA
android/               # optional TWA + widget
docs/NOTHING-PHONE-4B.md
```

Glyph follow-up (only if you want LEDs while the native app is open): add the official AAR from the [Glyph Developer Kit](https://github.com/Nothing-Developer-Programme/Glyph-Developer-Kit), `NothingKey`, `register(DEVICE_25131)`, `openSession()`, then `GlyphFrame.Builder(DEVICE_25131).buildChannel(0–3)` + `toggle` / `animate`. Do not expect that to appear on the lock screen.
