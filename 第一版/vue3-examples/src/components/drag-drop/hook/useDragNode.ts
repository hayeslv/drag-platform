/*
 * @Author: Lvhz
 * @Date: 2021-10-18 11:19:41
 * @Description: Description
 */
// import { lexicalCache, lexicalScoped, effect } from '../lexical-scoped/src/index';
import { lexicalCache, lexicalScoped, effect } from '@skedo/lexical-cache';
import { Ref, ref } from "vue";
import DragNode from "../object/DragNode";
import { DragEvents, RawDragEvents } from "../types/editor.types";

lexicalScoped('ref')

// <Draggable onDragStart... />
export function useDragNode(props : DragEvents, initialPosition : [number, number]) : [Ref<DragNode>, RawDragEvents] {
	const node = ref<DragNode>(new DragNode())
	const ver = ref(0)


	effect(() => {
		node.value.init()
		ver.value++
	}, initialPosition)

	const handlers : RawDragEvents= {
		onDragstart: (e: DragEvent) => {
      node.value.start(e)
      props.onDragStart && props.onDragStart(node.value as DragNode)
    },
    onDrag: (e: DragEvent) => {
      node.value.update(e)
      ver.value++
      props.onDrag && props.onDrag(node.value as DragNode)
    },
    onDragend: (e: DragEvent) => {
      node.value.update(e)
      props.onDragEnd && props.onDragEnd(node.value as DragNode)
    },
	}
	return [node as Ref<DragNode>,handlers]
}