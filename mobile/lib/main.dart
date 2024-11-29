import 'package:TaskIt/firebase_options.dart';
import 'package:TaskIt/presentation/screens/add-task/add_task_screen.dart';
import 'package:TaskIt/presentation/screens/auth/login_screen.dart';
import 'package:TaskIt/presentation/screens/auth/register_screen.dart';
import 'package:TaskIt/presentation/screens/home/home_screen.dart';
import 'package:TaskIt/presentation/screens/profile/profile_screen.dart';
import 'package:TaskIt/presentation/view_models/auth_view_model.dart';
import 'package:TaskIt/presentation/view_models/home_view_model.dart';
import 'package:TaskIt/presentation/view_models/profile_view_model.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthViewModel()),
        ChangeNotifierProvider(create: (context) => HomeViewModel()),
        Provider<UserService>(create: (_) => UserService()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/home',
      theme: ThemeData(
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: Color(0xFFC96868),
            textStyle: GoogleFonts.poppins(
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            backgroundColor: Color(0xFFC96868),
            textStyle: GoogleFonts.poppins(
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          hintStyle: GoogleFonts.kanit(color: Colors.black),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Color(0xFFC96868)),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.black),
          )
        ),
        datePickerTheme: DatePickerThemeData(
          backgroundColor: Colors.white,
          headerBackgroundColor: Color(0xFFC96868),
        )
      ),
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/add-task':
          case '/edit-task':
            final taskId = settings.arguments as String?;
            return MaterialPageRoute(
              builder: (_) => AddTaskScreen(taskId: taskId),
            );
          case '/login':
            return MaterialPageRoute(builder: (_) => LoginScreen());
          case '/register':
            return MaterialPageRoute(builder: (_) => RegisterScreen());
          case '/home':
            return MaterialPageRoute(builder: (_) => HomeScreen());
          case '/profile':
            return MaterialPageRoute(builder: (_) => ProfileScreen());
          default:
            return null;
        }
      },
    );
  }
}
