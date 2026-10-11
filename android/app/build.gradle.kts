plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "dev.harshitchauhan.portfolio"
    compileSdk = 35

    defaultConfig {
        applicationId = "dev.harshitchauhan.portfolio"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
        manifestPlaceholders["hostName"] = "harshh.pages.dev"
        manifestPlaceholders["defaultUrl"] = "https://harshh.pages.dev/"
        manifestPlaceholders["assetStatements"] =
            """[{"relation":["delegate_permission/common.handle_all_urls"],"target":{"namespace":"web","site":"https://harshh.pages.dev"}}]"""
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.androidbrowserhelper:androidbrowserhelper:2.6.1")
}
