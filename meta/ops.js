module.exports = {

	//
	// Attributes

	setAttribute: {
		id: 'SET_ATTRIBUTE',
		args: ['el', 'attr', 'value'],
		impl: "{{el}}.setAttribute({{attr}}, {{value}});"
	},

	removeAttribute: {
		id: 'REMOVE_ATTRIBUTE',
		args: ['el', 'attr'],
		impl: "{{el}}.removeAttribute({{attr}});"
	},

	//
	// Style

	style: {
		id: 'SET_STYLE',
		args: ['el', 'attribute', 'value'],
		du: {
			style: "style"
		},
		impl: "style({{el}}, {{attribute}}, {{value}});"
	},

	//
	// Classes

	addClass: {
		id: 'ADD_CLASS',
		args: ['el', 'classes'],
		du: {
			addClass: "addClass"
		},
		impl: "addClass({{el}}, {{classes}});"
	},

	removeClass: {
		id: 'REMOVE_CLASS',
		args: ['el', 'classes'],
		du: {
			removeClass: "removeClass"
		},
		impl: "removeClass({{el}}, {{classes}});"
	},

	toggleClass: {
		id: 'TOGGLE_CLASS',
		args: ['el', 'classes'],
		du: {
			toggleClass: "toggleClass"
		},
		impl: "toggleClass({{el}}, {{classes}});"
	},

	removeMatchingClasses: {
		id: 'REMOVE_MATCHING_CLASSES',
		args: ['el', 'regexp'],
		du: {
			removeMatchingClasses: "removeMatchingClasses"
		},
		impl: "removeMatchingClasses({{el}}, {{regexp}});"
	},

	//
	// Raw DOM interface

	appendChild: {
		id: 'APPEND_CHILD',
		args: ['el', 'newChild'],
		impl: "{{el}}.appendChild({{newChild}});"
	},

	insertBefore: {
		id: 'INSERT_BEFORE',
		args: ['parentElement', 'newElement', 'referenceElement'],
		impl: "{{parentElement}}.insertBefore({{newElement}}, {{referenceElement}});"
	},

	insertAfter: {
		id: 'INSERT_AFTER',
		args: ['parentElement', 'newElement', 'referenceElement'],
		impl: "{{parentElement}}.insertBefore({{newElement}}, {{referenceElement}}.nextSibling);"
	},

	removeChild: {
		id: 'REMOVE_CHILD',
		args: ['el', 'childElement'],
		impl: "{{el}}.removeChild({{childElement}});"
	},

	replaceChild: {
		id: 'REPLACE_CHILD',
		args: ['parentNode', 'newChild', 'oldChild'],
		impl: "{{parentNode}}.replaceChild({{newChild}}, {{oldChild}});"
	},

	//
	// Sugary

	before: {
		id: 'BEFORE',
		args: ['referenceNode', 'newNode'],
		impl: "{{referenceNode}}.parentNode.insertBefore({{newNode}}, {{referenceNode}});"
	},

	after: {
		id: 'AFTER',
		args: ['referenceNode', 'newNode'],
		impl: "{{referenceNode}}.parentNode.insertBefore({{newNode}}, {{referenceNode}}.nextSibling);"
	},

	replace: {
		id: 'REPLACE',
		args: ['oldNode', 'newNode'],
		impl: "{{oldNode}}.parentNode.replaceChild({{newNode}}, {{oldNode}});"
	},

	remove: {
		id: 'REMOVE',
		args: ['el'],
		impl: "{{el}}.parentNode.removeChild({{el}});"
	},

	append: {
		id: 'APPEND',
		args: ['el', 'content'],
		du: {
			append: "append"
		},
		impl: "append({{el}}, {{content}});"
	},

	clear: {
		id: 'CLEAR',
		args: ['el'],
		du: {
			clear: "clear"
		},
		impl: "clear({{el}});"
	},

	content: {
		id: 'CONTENT',
		args: ['el', 'htmlLike'],
		du: {
			content: "content"
		},
		impl: "content({{el}}, {{htmlLike}});"
	},

	//
	// Text

	text: {
		id: 'SET_TEXT',
		args: ['el', 'txt'],
		du: {
			text: "text"
		},
		impl: "text({{el}}, {{txt}});"
	},

	//
	// Call

	call: {
		id: 'CALL',
		args: ['fn'],
		impl: "{{fn}}();"
	}

}