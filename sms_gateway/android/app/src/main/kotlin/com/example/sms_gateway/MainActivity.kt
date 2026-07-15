package com.example.sms_gateway

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

        result.success(null)

    }

    else -> {

        result.notImplemented()

    }

}

        }
    }
}