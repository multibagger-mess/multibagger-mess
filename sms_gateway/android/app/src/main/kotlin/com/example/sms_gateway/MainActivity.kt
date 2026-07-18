package com.example.sms_gateway

import android.telephony.SmsManager
import android.os.Build
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.util.Log
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter

class MainActivity : FlutterActivity() {

    private val CHANNEL = "sms_gateway/native"

    private val SMS_SENT_ACTION = "SMS_GATEWAY_SENT"

    private val sentReceiver = object : BroadcastReceiver() {

    override fun onReceive(
        context: Context?,
        intent: Intent?
    ) {

        val part =
            intent?.getIntExtra("part", -1) ?: -1

        when (resultCode) {

            RESULT_OK -> {

                Log.d(
                    "SMS_GATEWAY",
                    "✅ Part $part sent successfully"
                )

            }

            else -> {

                Log.e(
                    "SMS_GATEWAY",
                    "❌ Part $part failed. ResultCode = $resultCode"
                )

            }

        }

    }

}

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {

    registerReceiver(
        sentReceiver,
        IntentFilter(SMS_SENT_ACTION),
        Context.RECEIVER_NOT_EXPORTED
    )

} else {

    @Suppress("DEPRECATION")
    registerReceiver(
        sentReceiver,
        IntentFilter(SMS_SENT_ACTION)
    )

}

        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            CHANNEL
        ).setMethodCallHandler { call, result ->

            when (call.method) {

                "ping" -> {
                    result.success("Android is connected")
                }

"sendSms" -> {

    android.util.Log.d("SMS_GATEWAY", "sendSms called")

    val phone = call.argument<String>("phone")
    val message = call.argument<String>("message")

    android.util.Log.d("SMS_GATEWAY", "Phone = $phone")
    android.util.Log.d("SMS_GATEWAY", "Message = $message")

    if (phone == null || message == null) {

        android.util.Log.d("SMS_GATEWAY", "Phone or Message is NULL")

        result.error(
            "INVALID_ARGUMENTS",
            "Phone or message missing",
            null
        )
        return@setMethodCallHandler
    }

try {

    android.util.Log.d("SMS_GATEWAY", "Before SmsManager")

    val smsManager =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            applicationContext.getSystemService(SmsManager::class.java)
        } else {
            SmsManager.getDefault()
        }

    android.util.Log.d("SMS_GATEWAY", "After SmsManager")

    val parts = smsManager.divideMessage(message)

Log.d(
    "SMS_GATEWAY",
    "Total Parts = ${parts.size}"
)

val sentIntents = ArrayList<PendingIntent>()

for (i in parts.indices) {

    Log.d(
        "SMS_GATEWAY",
        "Preparing PendingIntent for Part ${i + 1}"
    )

    val intent = Intent(SMS_SENT_ACTION).apply {

        putExtra("part", i + 1)

    }

    val pendingIntent = PendingIntent.getBroadcast(

        this,
        i,
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT or
        PendingIntent.FLAG_IMMUTABLE

    )

    sentIntents.add(pendingIntent)

}

smsManager.sendMultipartTextMessage(

    phone,

    null,

    ArrayList(parts),

    sentIntents,

    null

)

    android.util.Log.d(
        "SMS_GATEWAY",
        "sendMultipartTextMessage() invoked"
    )

    result.success(true)

} catch (e: Exception) {

    android.util.Log.e(
        "SMS_GATEWAY",
        "Exception",
        e
    )

    result.error(
        "SMS_ERROR",
        e.toString(),
        null
    )

}
}

                else -> result.notImplemented()

            }

        }
    }
    override fun onDestroy() {

    unregisterReceiver(sentReceiver)

    super.onDestroy()

}
}