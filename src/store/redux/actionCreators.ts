import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from './editorActionCreators'
import * as PresentationActionCreators from './presentationActionCreators'
import * as ElementActionCreators from './elementActionCreators'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
    ...PresentationActionCreators,
    ...ElementActionCreators,
}