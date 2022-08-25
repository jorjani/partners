import { Box, Card, CardContent, Grid, Typography, ListItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const ProjectRanker = (props) => {
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const newItems = [...props.projects];
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        props.setProjects(newItems)
    }

    const formatCategory = (category) => {
        let res = ""
        for (let i = 0; i < category.length; i++) {
            res += category[i];
            if (i < category.length - 1) {
                res += " | ";
            }
        }
        return res;
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" >
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {props.projects.map((item, index) => (
                            <Draggable draggableId={index.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card
                                            sx={{
                                                marginTop: 2,
                                                marginBottom: 2,
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="h5" component="h2">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {formatCategory(item.category)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )

};

export default ProjectRanker;