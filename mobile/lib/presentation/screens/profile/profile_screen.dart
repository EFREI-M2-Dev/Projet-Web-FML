import 'package:flutter/material.dart';
import 'dart:io';

import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:TaskIt/presentation/view_models/profile_view_model.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  String _name = '';
  String? _firebaseImageUrl;
  File? _localImageFile;
  bool _isLoading = false;
  TextEditingController _nameController = TextEditingController();

  String? _initialName;
  String? _initialImageUrl;

  @override
  void initState() {
    super.initState();
    _fetchUserProfile();

    // Add listener to track name changes
    _nameController.addListener(_onNameChanged);
  }

  @override
  void dispose() {
    // Remove listener when disposing the widget
    _nameController.removeListener(_onNameChanged);
    super.dispose();
  }

  void _onNameChanged() {
    setState(() {
      // Directly trigger state change, the getter will be recomputed on build
    });
  }

  Future<void> _fetchUserProfile() async {
    final userService = context.read<UserService>();
    final userProfile = await userService.getUserProfile();

    if (userProfile != null) {
      setState(() {
        _name = userProfile['name'] ?? '';
        _firebaseImageUrl = userProfile['imageURL'];
        _nameController.text = _name;

        _initialName = _name;
        _initialImageUrl = _firebaseImageUrl;
      });
    }
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _localImageFile = File(pickedFile.path);
        _firebaseImageUrl = null;
      });
    }
  }

  bool get _isFormChanged {
    // Return true if there are changes in the name or the image
    return _nameController.text != _initialName || _localImageFile != null;
  }

  Future<void> _saveProfile() async {
    if (!_formKey.currentState!.validate()) return;

    _formKey.currentState!.save();

    setState(() {
      _isLoading = true;
    });

    try {
      final userService = context.read<UserService>();

      if (_localImageFile != null) {
        await userService.saveUserProfile(_name, _localImageFile!);
      } else if (_firebaseImageUrl != null) {
        await userService.saveUserProfile(_name, File(_firebaseImageUrl!));
      } else {
        throw 'Please select a profile image.';
      }

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Profile updated successfully!')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Profile'),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    GestureDetector(
                      onTap: _pickImage,
                      child: CircleAvatar(
                        radius: 50,
                        backgroundImage: _localImageFile != null
                            ? FileImage(_localImageFile!)
                            : _firebaseImageUrl != null
                                ? NetworkImage(_firebaseImageUrl!)
                                : AssetImage('assets/pp_default.png')
                                    as ImageProvider,
                        child:
                            _localImageFile == null && _firebaseImageUrl == null
                                ? Icon(Icons.camera_alt, size: 30)
                                : null,
                      ),
                    ),
                    SizedBox(height: 20),
                    TextFormField(
                      controller: _nameController,
                      decoration: InputDecoration(labelText: 'Name'),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your name';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _name = value!;
                      },
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: _isFormChanged ? _saveProfile : null,
                      child: Text('Save Changes'),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
