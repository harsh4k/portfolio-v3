package dev.harshitchauhan.portfolio

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.widget.RemoteViews
import com.google.androidbrowserhelper.trusted.LauncherActivity

/**
 * Home-screen widget that opens the portfolio TWA.
 *
 * Nothing OS 3+ can list third-party widgets in Customize lock screen.
 * That is a user picker feature, not a public "lock screen widget" SDK.
 * This provider is a normal Android AppWidget — it is not a Nothing Card Service.
 */
class PortfolioWidget : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray,
    ) {
        for (id in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.widget_portfolio)
            val intent = Intent(context, LauncherActivity::class.java).apply {
                data = Uri.parse("https://harshitchauhan.dev/?source=widget")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            val flags =
                PendingIntent.FLAG_UPDATE_CURRENT or
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        PendingIntent.FLAG_IMMUTABLE
                    } else {
                        0
                    }
            views.setOnClickPendingIntent(
                R.id.widget_root,
                PendingIntent.getActivity(context, id, intent, flags),
            )
            appWidgetManager.updateAppWidget(id, views)
        }
    }
}
