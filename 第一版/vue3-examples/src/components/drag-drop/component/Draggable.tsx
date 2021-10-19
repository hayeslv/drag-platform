/*
 * @Author: Lvhz
 * @Date: 2021-10-18 11:19:39
 * @Description: Description
 */
import { ref, SetupContext, VNode } from "vue"
import {lexicalCache, lexicalScoped} from '@skedo/lexical-cache'
// import {lexicalCache, lexicalScoped} from '../lexical-scoped/src/index'
// import { lexicalScoped, lexicalCache } from "../lexical-scoped/src/index"
import { DragEvents, DraggableProps, RawDragEvents } from "../types/editor.types"
import { useDragNode } from "../hook/useDragNode"
import DragNode from "../object/DragNode"
import { deepMerge } from "../util/deepMerge"

lexicalScoped('ref')

function assignPropsToVNode(vNode : VNode, props : any) {
	vNode.props = deepMerge(vNode.props, props) 
	return vNode
}

function addPropsToVNode(vNode : VNode, handlers : RawDragEvents, props : DraggableProps, node : DragNode) {

	const vNodeProps : any = {
		...handlers,
		draggable : true
	}

	vNodeProps.style = {
		position : 'absolute',
		top : props.initialPosition[1] + 'px',
		left : props.initialPosition[0] + 'px',
		transform : `translate(${node.diffX}px, ${node.diffY}px)`
	}

	vNode = assignPropsToVNode(vNode, vNodeProps)
	return vNode
}

const Draggable = (props : DraggableProps, ctx : SetupContext) => {
	const [node, handlers] = useDragNode(props, props.initialPosition)
	let vNode : VNode = ctx.slots.default!()[0]
	vNode = addPropsToVNode(vNode, handlers, props, node.value)
	return vNode
}

export default Draggable
// <Draggable><div a={1}>...</div></Draggable>