import 'package:flutter/material.dart';
import 'api_service.dart';

class ProgressPage extends StatefulWidget {
  final String userId;

  ProgressPage({required this.userId});

  @override
  _ProgressPageState createState() => _ProgressPageState();
}

class _ProgressPageState extends State<ProgressPage> {
  List<dynamic> badges = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchBadges();
  }

  Future<void> fetchBadges() async {
    final data = await ApiService.getUserBadges(widget.userId);
    if (data != null) {
      setState(() {
        badges = data;
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Progress & Badges'),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : badges.isEmpty
              ? Center(child: Text('No badges earned yet'))
              : ListView.builder(
                  itemCount: badges.length,
                  itemBuilder: (context, index) {
                    final badge = badges[index];
                    return Card(
                      child: ListTile(
                        leading: badge['img'] != null
                            ? Image.network(
                                'http://192.168.1.10:9000${badge['img']}', // Make sure this URL is correct
                                width: 50,
                                height: 50,
                              )
                            : Icon(Icons.star),
                        title: Text(badge['name']),
                        subtitle: Text(badge['desc']),
                      ),
                    );
                  },
                ),
    );
  }
}
