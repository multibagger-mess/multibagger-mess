class SmsRequest {

  final String phoneNumber;

  final String message;

  SmsRequest({

    required this.phoneNumber,

    required this.message,

  });

  factory SmsRequest.fromJson(

    Map<String, dynamic> json,

  ) {

    return SmsRequest(

      phoneNumber: json["phoneNumber"],

      message: json["message"],

    );

  }

}