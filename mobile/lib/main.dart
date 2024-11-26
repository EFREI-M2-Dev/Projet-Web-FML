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
      initialRoute: '/login',
      routes: {
        '/login': (_) => LoginScreen(),
        '/register': (_) => RegisterScreen(),
        '/home': (_) => HomeScreen(),
        '/profile': (_) => ProfileScreen(),
        '/add-task': (_) => AddTaskScreen(),
      },
    );
  }
}
