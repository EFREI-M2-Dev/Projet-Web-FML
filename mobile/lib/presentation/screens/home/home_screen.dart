import 'package:TaskIt/presentation/components/navbar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:TaskIt/presentation/view_models/home_view_model.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final homeViewModel = Provider.of<HomeViewModel>(context);

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(
                colors: [Color(0xFFF3EADD), Colors.white],
                begin: Alignment.topCenter,
                end: Alignment.center)),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Navbar(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Today\'s Tasks',
                    style: TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pushNamed(context, '/add-task');
                    },
                    icon: Icon(Icons.add),
                    label: Text('Add'),
                  ),
                ],
              ),
              SizedBox(height: 16.0),
              Expanded(
                child: StreamBuilder<List<Map<String, dynamic>>>(
                  stream: homeViewModel.tasksStream,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    }

                    if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    }

                    final tasks = snapshot.data ?? [];

                    if (tasks.isEmpty) {
                      return Center(child: Text('No tasks available'));
                    }

                    return ListView.builder(
                      itemCount: tasks.length,
                      itemBuilder: (context, index) {
                        final task = tasks[index];
                        final isDone = task['done'] ?? false;

                        return Card(
                          color: task['thematicData']?["color"] != null
                              ? Color(0xFF000000 +
                                  int.parse(
                                      task['thematicData']["color"]
                                          .substring(1, 7),
                                      radix: 16))
                              : Color(0x80E0E0E0),
                          margin: const EdgeInsets.symmetric(vertical: 8.0),
                          child: ListTile(
                            leading: Checkbox(
                              value: isDone,
                              onChanged: (value) async {
                                try {
                                  await homeViewModel.toggleTaskState(
                                      task['id'], isDone);
                                } catch (e) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content:
                                          Text('Failed to update task: $e'),
                                    ),
                                  );
                                }
                              },
                            ),
                            title: Text(
                              task['title'] ?? 'No Title',
                              style: TextStyle(
                                decoration: isDone
                                    ? TextDecoration.lineThrough
                                    : TextDecoration.none,
                                /* color: isDone ? Colors.grey : Colors.black, */
                              ),
                            ),
                            subtitle:
                                Text(task['description'] ?? 'No Description'),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  icon: Icon(Icons.edit, color: Colors.blue),
                                  onPressed: () async {
                                    Navigator.pushNamed(
                                      context,
                                      '/edit-task',
                                      arguments: task['id'],
                                    );
                                  },
                                ),
                                IconButton(
                                  icon: Icon(Icons.delete, color: Colors.red),
                                  onPressed: () async {
                                    final confirm = await showDialog<bool>(
                                      context: context,
                                      builder: (context) {
                                        return AlertDialog(
                                          title: Text('Delete Task'),
                                          content: Text(
                                              'Are you sure you want to delete this task?'),
                                          actions: [
                                            TextButton(
                                              onPressed: () =>
                                                  Navigator.of(context)
                                                      .pop(false),
                                              child: Text('Cancel'),
                                            ),
                                            TextButton(
                                              onPressed: () =>
                                                  Navigator.of(context)
                                                      .pop(true),
                                              child: Text('Delete'),
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
                                                'Failed to delete task: $e'),
                                          ),
                                        );
                                      }
                                    }
                                  },
                                ),
                              ],
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
    );
  }
}
