import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:io';

class UserService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseStorage _storage = FirebaseStorage.instance;

  Future<void> saveUserProfile(String name, File imageFile) async {
    final user = _auth.currentUser;

    if (user == null) {
      throw 'No user logged in';
    }

    try {
      final storageRef = _storage.ref().child('user_images/${user.uid}.jpg');
      await storageRef.putFile(imageFile);
      final imageURL = await storageRef.getDownloadURL();

      await _firestore.collection('users').doc(user.uid).set({
        'name': name,
        'imageURL': imageURL,
      }, SetOptions(merge: true));

      print('User profile updated successfully');
    } catch (e) {
      print("Error during save: $e");
      throw 'Failed to save user profile: $e';
    }
  }

  Future<Map<String, dynamic>?> getUserProfile() async {
    final user = _auth.currentUser;

    if (user == null) {
      return null;
    }

    final docSnapshot =
        await _firestore.collection('users').doc(user.uid).get();
    return docSnapshot.data();
  }
}
