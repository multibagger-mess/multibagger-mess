class SmsJob {

  final String id;

  final String phone;

  final String message;

  final String status;

  SmsJob({

    required this.id,

    required this.phone,

    required this.message,

    required this.status,

  });

  factory SmsJob.fromJson(Map<String,dynamic> json){

    return SmsJob(

      id: json["_id"],

      phone: json["phone"],

      message: json["message"],

      status: json["status"],

    );

  }

}