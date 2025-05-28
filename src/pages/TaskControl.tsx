import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const dummyTasks = [
    {
        id: 1,
        title: '資料作成',
        description: '会議資料を作成する',
        dueDate: '2025-06-01',
        status: '未着手',
        priority: '高',
    },
    {
        id: 2,
        title: 'メール返信',
        description: 'クライアントからの質問に回答',
        dueDate: '2025-05-29',
        status: '進行中',
        priority: '中',
    },
];

const TaskList: React.FC = () => {
    const { user } = useAuth();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                {user?.username} さんのタスクリスト
            </Typography>

            <List>
                {dummyTasks.map((task) => (
                    <ListItem key={task.id} sx={{ borderBottom: '1px solid #ccc' }}>
                        <ListItemText
                            primary={`${task.title}（${task.priority}）`}
                            secondary={`期限: ${task.dueDate} ／ ステータス: ${task.status}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskList;