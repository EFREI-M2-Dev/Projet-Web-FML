import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:io';

import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:TaskIt/presentation/view_models/profile_view_model.dart';

import '../../components/header.dart';

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

    _nameController.addListener(_onNameChanged);
  }

  @override
  void dispose() {
    _nameController.removeListener(_onNameChanged);
    super.dispose();
  }

  void _onNameChanged() {
    setState(() {});
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
      backgroundColor: Color(0xFFF3EADD),
      appBar: AppBar(
        title: Text(
          'Edit Profile',
          style: GoogleFonts.poppins(
              textStyle: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            color: Color(0xFFC96868),
          )),
        ),
        backgroundColor: Color(0xFFfbdfa1),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 43.0),
                      child: GestureDetector(
                        onTap: _pickImage,
                        child: CircleAvatar(
                          radius: 80,
                          backgroundImage: _localImageFile != null
                              ? FileImage(_localImageFile!)
                              : _firebaseImageUrl != null
                              ? NetworkImage(_firebaseImageUrl!)
                              : AssetImage('assets/pp_default.png')
                          as ImageProvider,
                          child:
                          _localImageFile == null && _firebaseImageUrl == null
                              ? Icon(Icons.camera_alt, size: 120)
                              : null,
                        ),
                      ),
                    ),
                    SizedBox(height: 20),
                    TextFormField(
                      controller: _nameController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(40.0),
                          ),
                          hintText: 'Name'),
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
                    FilledButton(
                      style: FilledButton.styleFrom(
                        minimumSize: Size(500.0, 50.0),
                      ),
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
