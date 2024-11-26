import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class HomeViewModel with ChangeNotifier {
  Stream<List<Map<String, dynamic>>> get tasksStream {
    final user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return const Stream.empty();
    }

    return FirebaseFirestore.instance
        .collection('tasks')
        .where('userUID', isEqualTo: user.uid)
        .snapshots()
        .asyncMap((snapshot) async {
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

      print(tasks);

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
