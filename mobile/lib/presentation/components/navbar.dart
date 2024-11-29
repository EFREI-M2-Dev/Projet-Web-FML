import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:TaskIt/presentation/view_models/profile_view_model.dart';

class Navbar extends StatelessWidget {
  const Navbar({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>?>(
      future: context.read<UserService>().getUserProfile(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Container(
            height: 70,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            margin: const EdgeInsets.symmetric(vertical: 20.0),
            decoration: BoxDecoration(
              color: Color(0xFFC96868),
              borderRadius: BorderRadius.circular(40.0),
            ),
            child: Center(
              child: CircularProgressIndicator(color: Colors.white),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data == null) {
          return Container(
            height: 70,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: Color(0xFFC96868),
              borderRadius: BorderRadius.circular(40.0),
            ),
            margin: const EdgeInsets.symmetric(vertical: 20.0),
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
          height: 70,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(40.0),
          ),
          margin: const EdgeInsets.symmetric(vertical: 20.0),
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                userName,
                style: GoogleFonts.kanit(
                    textStyle: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF444343),
                )),
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
