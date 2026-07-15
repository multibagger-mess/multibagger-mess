import 'sms_job.dart';

class GatewayPollResponse {

  final bool success;

  final SmsJob? job;

  const GatewayPollResponse({

    required this.success,

    this.job,

  });

  factory GatewayPollResponse.fromJson(
      Map<String, dynamic> json) {

    return GatewayPollResponse(

      success: json["success"],

      job: json["job"] == null
          ? null
          : SmsJob.fromJson(json["job"]),

    );

  }

}