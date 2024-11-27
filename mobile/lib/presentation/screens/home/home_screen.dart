import 'package:TaskIt/presentation/components/navbar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:easy_date_timeline/easy_date_timeline.dart';
import 'package:TaskIt/presentation/view_models/home_view_model.dart';

import '../../components/header.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final homeViewModel = Provider.of<HomeViewModel>(context);

    return Scaffold(
      backgroundColor: Color(0xFFF3EADD),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(80.0),
        child: Header(),
      ),
      body: Container(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Navbar(),
              Container(
                padding: EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16.0),
                ),
                child: EasyDateTimeLine(
                  initialDate: DateTime.now(),
                  onDateChange: (selectedDate) {
                    homeViewModel.changeFilterDate(selectedDate);
                  },
                  activeColor: Color(0xFFC96868),
                ),
              ),
              SizedBox(height: 20.0),
              Expanded(
                child: Container(
                  padding: EdgeInsets.all(24.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16.0),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Ma liste de tâches',
                            style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF444343),
                              ),
                            ),
                          ),
                          FilledButton.icon(
                            onPressed: () {
                              Navigator.pushNamed(context, '/add-task');
                            },
                            icon: Icon(Icons.add),
                            label: Text('Ajouter'),
                          ),
                        ],
                      ),
                      SizedBox(height: 16.0),
                      Expanded(
                        child: StreamBuilder<List<Map<String, dynamic>>>(
                          stream: homeViewModel.tasksStream,
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return Center(child: CircularProgressIndicator());
                            }

                            if (snapshot.hasError) {
                              return Center(
                                child: Text('Erreur : ${snapshot.error}'),
                              );
                            }

                            final tasks = snapshot.data ?? [];

                            if (tasks.isEmpty) {
                              return Center(
                                child: Text('Aucune tâche disponible'),
                              );
                            }

                            return ListView.builder(
                              itemCount: tasks.length,
                              itemBuilder: (context, index) {
                                final task = tasks[index];
                                final isDone = task['done'] ?? false;

                                return SizedBox(
                                  child: Card(
                                    color: task['thematicData']?["color"] != null
                                        ? Color(0xFF000000 +
                                        int.parse(task['thematicData']["color"].substring(1, 7), radix: 16))
                                        : Color(0x80E0E0E0),
                                    shadowColor: Colors.transparent,
                                    elevation: 0,
                                    margin: const EdgeInsets.symmetric(
                                        vertical: 8.0),
                                    child: ListTile(
                                      leading: Checkbox(
                                        value: isDone,
                                        onChanged: (value) async {
                                          try {
                                            await homeViewModel.toggleTaskState(
                                                task['id'], isDone);
                                          } catch (e) {
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(
                                              SnackBar(
                                                content: Text(
                                                    'Erreur de mise à jour : $e'),
                                              ),
                                            );
                                          }
                                        },
                                        activeColor: Color(0xFF80ADB6),
                                      ),
                                      title: Text(
                                        task['title'] ?? 'Pas de titre',
                                        style: GoogleFonts.poppins(
                                            textStyle: TextStyle(
                                          fontSize: 17.0,
                                          fontWeight: FontWeight.w600,
                                          color: Color(0xFF444343),
                                          decoration: isDone
                                              ? TextDecoration.lineThrough
                                              : TextDecoration.none,
                                        )),
                                      ),
                                      subtitle: Text(
                                        task['description'] ??
                                            'Pas de description',
                                        style: GoogleFonts.poppins(
                                            textStyle: TextStyle(
                                          fontWeight: FontWeight.w500,
                                          fontSize: 14.0,
                                          color: Color(0xFF444343),
                                        )),
                                      ),
                                      trailing: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          InkWell(
                                            borderRadius:
                                                BorderRadius.circular(50.0),
                                            onTap: () async {
                                              Navigator.pushNamed(
                                                context,
                                                '/edit-task',
                                                arguments: task['id'],
                                              );
                                            },
                                            child: Container(
                                              padding: EdgeInsets.all(4.0),
                                              decoration: BoxDecoration(
                                                color: Color(0xFFf99d5a),
                                                borderRadius:
                                                    BorderRadius.circular(50.0),
                                              ),
                                              child: Icon(Icons.edit,
                                                  color: Colors.white),
                                            ),
                                          ),
                                          SizedBox(width: 9.0),
                                          InkWell(
                                            borderRadius:
                                                BorderRadius.circular(50.0),
                                            onTap: () async {
                                              final confirm =
                                                  await showDialog<bool>(
                                                context: context,
                                                builder: (context) {
                                                  return AlertDialog(
                                                    title: Text(
                                                      'Supprimer la tâche',
                                                      style:
                                                          GoogleFonts.poppins(
                                                              textStyle:
                                                                  TextStyle(
                                                        fontWeight:
                                                            FontWeight.w700,
                                                        fontSize: 18.0,
                                                        color:
                                                            Color(0xFFC96868),
                                                      )),
                                                    ),
                                                    content: Text(
                                                      'Êtes-vous sûr(e) de vouloir supprimer cette tâche ?',
                                                      style:
                                                          GoogleFonts.kanit(
                                                              textStyle:
                                                                  TextStyle(
                                                        fontWeight:
                                                            FontWeight.w400,
                                                        fontSize: 16.6,
                                                        color:
                                                            Color(0xFF444343),
                                                      )),
                                                    ),
                                                    actions: [
                                                      TextButton(
                                                        onPressed: () =>
                                                            Navigator.of(
                                                                    context)
                                                                .pop(false),
                                                        child: Text('Annuler'),
                                                      ),
                                                      TextButton(
                                                        onPressed: () =>
                                                            Navigator.of(
                                                                    context)
                                                                .pop(true),
                                                        child:
                                                            Text('Supprimer'),
                                                      ),
                                                    ],
                                                  );
                                                },
                                              );

                                              if (confirm == true) {
                                                try {
                                                  await homeViewModel
                                                      .deleteTask(task['id']);
                                                } catch (e) {
                                                  ScaffoldMessenger.of(context)
                                                      .showSnackBar(
                                                    SnackBar(
                                                      content: Text(
                                                          'Erreur de suppression : $e'),
                                                    ),
                                                  );
                                                }
                                              }
                                            },
                                            child: Container(
                                              padding: EdgeInsets.all(4.0),
                                              decoration: BoxDecoration(
                                                color: Colors.red,
                                                borderRadius:
                                                    BorderRadius.circular(50.0),
                                              ),
                                              child: Icon(Icons.delete,
                                                  color: Colors.white),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              },
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 20.0),
            ],
          ),
        ),
      ),
    );
  }
}
