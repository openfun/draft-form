import React, { useState } from 'react';
import type { WidgetProps } from '@rjsf/core';
import ShowCaseWidgetProps from '../types/Widgets';
import { makeid } from '../utils';
import { addItemToSchema, addItemToUiSchema } from '../context/InteractionMethods';
import { useVerna } from '../context/VernaContextProvider';

export default function DropZone({ id }: Partial<WidgetProps>) {
  const [draggingOver, setDraggingOver] = useState(false);
  const verna = useVerna();

  function addItem(widgetProps?: ShowCaseWidgetProps) {
    if (!id) return;
    const newKey = makeid(10);
    addItemToSchema(newKey, id, verna, widgetProps?.type);
    addItemToUiSchema(newKey, id, verna, widgetProps?.widgetName);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const widgetProps = JSON.parse(event.dataTransfer.getData('object'));
    addItem(widgetProps);
    setDraggingOver(false);
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDraggingOver(true);
  }

  return (
    <div
      className={draggingOver ? 'drop-zone-drag-over' : 'drop-zone'}
      onDragOver={onDragOver}
      onDragLeave={() => setDraggingOver(false)}
      onDrop={onDrop}
    >
      <div className={draggingOver ? 'drop-zone-divider-drag-over' : 'drop-zone-divider'} />
    </div>
  );
}