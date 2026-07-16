class SmsJob {

  final String id;

  final String phone;

  final String message;

  final String status;

  final DateTime? sentAt;

  SmsJob({

    required this.id,

    required this.phone,

    required this.message,

    required this.status,

    this.sentAt,

  });

  factory SmsJob.fromJson(Map<String,dynamic> json){

    return SmsJob(

      id: json["_id"],

      phone: json["phone"],

      message: json["message"],

      status: json["status"],

      sentAt: json["sentAt"] == null
          ? null
          : DateTime.parse(json["sentAt"]),

);

  }

}