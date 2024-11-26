import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:TaskIt/presentation/view_models/profile_view_model.dart';

class Navbar extends StatelessWidget {
  const Navbar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>?>(
      future: context.read<UserService>().getUserProfile(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Container(
            height: 60,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            color: Colors.blue,
            child: Center(
              child: CircularProgressIndicator(color: Colors.white),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data == null) {
          return Container(
            height: 60,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            color: Colors.blue,
            child: Center(
              child: Text(
                'Error loading user data',
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ),
          );
        }

        final user = snapshot.data!;
        final userName = user['name'] ?? 'Unknown User';
        final imageUrl = user['imageURL'] ?? '';

        return Container(
          height: 80,
          padding: const EdgeInsets.only(bottom: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                userName,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              GestureDetector(
                onTap: () {
                  Navigator.pushNamed(context, '/profile');
                },
                child: CircleAvatar(
                  radius: 20,
                  backgroundImage: imageUrl.isNotEmpty
                      ? NetworkImage(imageUrl)
                      : AssetImage('assets/pp_default.png') as ImageProvider,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
