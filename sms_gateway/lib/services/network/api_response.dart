class ApiResponse {
  final bool success;
  final String message;

  ApiResponse({
    required this.success,
    required this.message,
  });

  Map<String, dynamic> toJson() {
    return {
      "success": success,
      "message": message,
    };
  }
}