import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

class Header extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFfbdfa1), // Updated background color
      padding: EdgeInsets.fromLTRB(16.0, 60.0, 16.0, 16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SvgPicture.asset(
            'assets/logo.svg',
            height: 50,
          ),
          SizedBox(width: 16.0),
          Text(
            'TASK-IT',
            style: GoogleFonts.kanit(
                textStyle: TextStyle(
              fontSize: 36.0,
              fontWeight: FontWeight.bold,
              color: Color(0xFFC96868), // Updated text color
            )),
          ),
        ],
      ),
    );
  }
}
