import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:TaskIt/presentation/view_models/add_task_view_model.dart';

class AddTaskScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AddTaskViewModel(),
      child: Scaffold(
        appBar: AppBar(title: Text('Add Task')),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Consumer<AddTaskViewModel>(
            builder: (context, viewModel, child) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Create new Task',
                    style: TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16.0),
                  // Titre de la tâche
                  TextField(
                    controller: viewModel.titleController,
                    decoration: InputDecoration(
                      labelText: 'Task Title',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 16.0),
                  // Description de la tâche
                  TextField(
                    controller: viewModel.descriptionController,
                    decoration: InputDecoration(
                      labelText: 'Task Description',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 4,
                  ),
                  SizedBox(height: 16.0),
                  // Sélection de la date
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          viewModel.selectedDate == null
                              ? 'No Date Selected'
                              : 'Selected Date: ${viewModel.selectedDate?.toLocal().toString().split(' ')[0]}',
                        ),
                      ),
                      TextButton(
                        onPressed: () => viewModel
                            .pickDate(context), // Passer le context ici
                        child: Text('Pick a Date'),
                      ),
                    ],
                  ),
                  Spacer(),
                  // Bouton pour sauvegarder la tâche
                  ElevatedButton(
                    onPressed: () async {
                      try {
                        await viewModel.saveTask();
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Task added successfully!')),
                        );
                        Navigator.pop(context); // Retour à l'écran précédent
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(e.toString())),
                        );
                      }
                    },
                    child: Text('Save Task'),
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(double.infinity, 50), // Large button
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
