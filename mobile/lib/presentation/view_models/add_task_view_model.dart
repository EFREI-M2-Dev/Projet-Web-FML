import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AddTaskViewModel with ChangeNotifier {
  final titleController = TextEditingController();
  final descriptionController = TextEditingController();
  DateTime? selectedDate;

  Future<void> saveTask() async {
    if (titleController.text.isEmpty || selectedDate == null) {
      throw 'Please provide a title and select a date';
    }

    final title = titleController.text;
    final description = descriptionController.text;
    final date = selectedDate;

    try {
      final userUID = FirebaseAuth.instance.currentUser?.uid;

      if (userUID == null) {
        throw 'No user is logged in';
      }

      await FirebaseFirestore.instance.collection('tasks').add({
        'title': title,
        'description': description,
        'atDate': Timestamp.fromDate(date!),
        'userUID': userUID,
        'done': false,
      });
    } catch (e) {
      throw 'Failed to save task: $e';
    }
  }

  void pickDate(BuildContext context) async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null && pickedDate != selectedDate) {
      selectedDate = pickedDate;
      notifyListeners();
    }
  }

  @override
  void dispose() {
    titleController.dispose();
    descriptionController.dispose();
    super.dispose();
  }
}
