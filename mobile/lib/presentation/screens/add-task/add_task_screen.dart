import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:TaskIt/presentation/view_models/add_task_view_model.dart';

class AddTaskScreen extends StatelessWidget {
  final String? taskId;

  const AddTaskScreen({super.key, this.taskId});

  @override
  Widget build(BuildContext context) {
    final isEdit = taskId != null;

    return ChangeNotifierProvider(
      create: (context) {
        final viewModel = AddTaskViewModel();
        if (isEdit) {
          viewModel.loadTask(taskId!);
        }
        viewModel.fetchThematics();
        return viewModel;
      },
      child: Scaffold(
        backgroundColor: Color(0xFFF3EADD),
        appBar: AppBar(
          backgroundColor: Color(0xFFfbdfa1),
          title: Text(
            isEdit ? "Modification d'une tâche" : 'Nouvelle tâche',
            style: GoogleFonts.poppins(
              textStyle: TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.bold,
                color: Color(0xFFC96868),
              ),
            ),
          ),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Consumer<AddTaskViewModel>(
            builder: (context, viewModel, child) {
              return Container(
                padding: EdgeInsets.all(24.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(15.0),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isEdit
                          ? 'Modifier la tâche'
                          : 'Ajouter une nouvelle tâche',
                      style: GoogleFonts.poppins(
                        textStyle: TextStyle(
                          fontSize: 24.0,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF444343),
                        ),
                      ),
                    ),
                    SizedBox(height: 16.0),
                    TextField(
                      controller: viewModel.titleController,
                      decoration: InputDecoration(
                        hintText: 'Titre',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 16.0),
                    DropdownButtonFormField<String>(
                      value: viewModel.selectedThematic,
                      items: viewModel.thematics
                          .map(
                            (thematic) => DropdownMenuItem<String>(
                              value: thematic['id'],
                              child: Row(
                                children: [
                                  Container(
                                    width: 16,
                                    height: 16,
                                    margin: EdgeInsets.only(right: 8.0),
                                    decoration: BoxDecoration(
                                      color: Color(
                                        int.parse(
                                            '0xff${thematic['color'].substring(1)}'),
                                      ),
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                  Text(thematic['label']),
                                ],
                              ),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        viewModel.selectedThematic = value;
                        viewModel.notifyListeners();
                      },
                      decoration: InputDecoration(
                        hintText: 'Thème',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 16.0),
                    TextField(
                      controller: viewModel.descriptionController,
                      decoration: InputDecoration(
                        hintText: 'Description',
                        border: OutlineInputBorder(),
                      ),
                      maxLines: 4,
                    ),
                    SizedBox(height: 16.0),
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            viewModel.selectedDate == null
                                ? 'Aucune date sélectionnée'
                                : 'Date choisie: ${viewModel.selectedDate?.toLocal().toString().split(' ')[0]}',
                          ),
                        ),
                        TextButton(
                          onPressed: () => viewModel.pickDate(context),
                          child: Text('Choissisez une date'),
                        ),
                      ],
                    ),
                    Spacer(),
                    FilledButton(
                      onPressed: () async {
                        try {
                          await viewModel.saveTask(taskId);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Task added successfully!')),
                          );
                          Navigator.pop(context);
                        } catch (e) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text(e.toString())),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        minimumSize: Size(double.infinity, 50),
                      ),
                      child: Text('Save Task'),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
