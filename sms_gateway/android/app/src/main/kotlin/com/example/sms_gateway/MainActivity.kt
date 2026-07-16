package com.example.sms_gateway

import android.telephony.SmsManager
import android.os.Build
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {

    private val CHANNEL = "sms_gateway/native"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

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

    smsManager.sendMultipartTextMessage(
        phone,
        null,
        parts,
        null,
        null
    )

    android.util.Log.d(
        "SMS_GATEWAY",
        "Multipart SMS executed"
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
}