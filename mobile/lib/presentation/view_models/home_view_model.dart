import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class HomeViewModel with ChangeNotifier {
  DateTime? _filterDate = DateTime.now();

  // Méthode pour mettre à jour la date de filtre
  Future<void> changeFilterDate(DateTime date) async {
    _filterDate = date;
    notifyListeners();
  }

  Stream<List<Map<String, dynamic>>> get tasksStream {
    final user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return const Stream.empty();
    }

    var query = FirebaseFirestore.instance
        .collection('tasks')
        .where('userUID', isEqualTo: user.uid);

    if (_filterDate != null) {
      final startOfDay = DateTime(
        _filterDate!.year,
        _filterDate!.month,
        _filterDate!.day,
      );
      final endOfDay = startOfDay.add(const Duration(days: 1));

      query = query
          .where('atDate', isGreaterThanOrEqualTo: startOfDay)
          .where('atDate', isLessThan: endOfDay);
    }

    return query.snapshots().asyncMap((snapshot) async {
      final tasks = snapshot.docs.map((doc) {
        return {
          'id': doc.id,
          ...doc.data(),
        };
      }).toList();

      for (var task in tasks) {
        final thematicId = task['thematic'];
        if (thematicId != null) {
          final thematicDoc = await FirebaseFirestore.instance
              .collection('thematics')
              .doc(thematicId)
              .get();

          if (thematicDoc.exists) {
            task['thematicData'] = {
              'label': thematicDoc['label'],
              'color': thematicDoc['color'],
            };
          }
        }
      }

      return tasks;
    });
  }

  Future<void> toggleTaskState(String taskId, bool currentState) async {
    try {
      await FirebaseFirestore.instance.collection('tasks').doc(taskId).update({
        'done': !currentState,
      });
    } catch (e) {
      throw Exception('Failed to update task state: $e');
    }
  }

  Future<void> deleteTask(String taskId) async {
    try {
      await FirebaseFirestore.instance.collection('tasks').doc(taskId).delete();
    } catch (e) {
      throw Exception('Failed to delete task: $e');
    }
  }
}
