# Android wrapper (Trusted Web Activity)

Minimal native shell around the **existing website**. It does not reimplement the UI.

It exists only for capabilities a PWA cannot provide:

- A Play Store / sideload app identity
- Android app shortcuts (long-press the icon)
- A standard `AppWidgetProvider` you can try to pin on the home screen, and on Nothing OS 3+ possibly add from **Customize lock screen → widgets** if the OS lists third-party widgets

It does **not**:

- Embed the site on the lock screen as a live webpage
- Call Glyph LEDs (see `docs/NOTHING-PHONE-4B.md` — Glyph is foreground-only and is not a lock-screen launcher)
- Use Nothing’s private Card Service APIs

## Build

1. Install Android Studio (Koala or newer) and a JDK 17.
2. Open this `android/` folder.
3. Let Gradle sync.
4. Copy `../harshit-portfolio/public/pwa-icons/icon-192.png` to `app/src/main/res/mipmap-xxhdpi/ic_launcher.png` if the mipmap is missing.
5. Run on the Phone (4b) or `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

Debug install:

```bash
cd android
./gradlew :app:installDebug
```

On Windows PowerShell:

```powershell
cd android
.\gradlew.bat :app:installDebug
```

(Create the Gradle wrapper in Android Studio: **File → Settings → Build → Gradle** or run `gradle wrapper` once.)

## Hide the Chrome URL bar (Digital Asset Links)

Until `https://harshitchauhan.dev/.well-known/assetlinks.json` lists this app’s **release signing certificate** SHA-256, Chrome may show a thin URL bar.

1. Build a release keystore (or use Play App Signing’s **app signing key** certificate).
2. `keytool -list -v -keystore your.keystore`
3. Put the SHA-256 into `harshit-portfolio/public/.well-known/assetlinks.json` (replace `REPLACE_WITH_UPLOAD_CERT_SHA256`).
4. Deploy the site, then:  
   `adb shell pm verify-app-links --re-verify dev.harshitchauhan.portfolio`

## Closest lock-screen path

1. Install this APK **or** the PWA.
2. Long-press the lock screen → **Customize lock screen** → **Widgets**.
3. If **Harshit portfolio** appears under third-party widgets, add it. One tap opens the TWA (device still authenticates if the phone is locked — that is Android policy).

If the widget is missing from the lock-screen picker, add it on the **home screen** instead. That is the reliable path.
