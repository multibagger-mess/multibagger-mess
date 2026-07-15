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

                    val phone = call.argument<String>("phone")
                    val message = call.argument<String>("message")

                    if (phone == null || message == null) {
                        result.error(
                            "INVALID_ARGUMENTS",
                            "Phone or message missing",
                            null
                        )
                        return@setMethodCallHandler
                    }

                    try {

                        val smsManager =
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                                applicationContext.getSystemService(SmsManager::class.java)
                            } else {
                                SmsManager.getDefault()
                            }

                        smsManager.sendTextMessage(
                            phone,
                            null,
                            message,
                            null,
                            null
                        )

                        result.success(true)

                    } catch (e: Exception) {

                        result.error(
                            "SMS_ERROR",
                            e.message,
                            null
                        )

                    }

                }

                else -> result.notImplemented()

            }

        }
    }
}