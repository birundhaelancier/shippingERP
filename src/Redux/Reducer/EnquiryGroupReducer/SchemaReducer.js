import { GET_SCHEMA_LIST,VIEW_SCHEMA_LIST } from '../../Utils/constant';
const initalState = {
    GetSchemaList: [],
    ViewSchemaList:[]
  };
export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SCHEMA_LIST:
            return { ...state, GetSchemaList: payload }
        case VIEW_SCHEMA_LIST:
            return { ...state, ViewSchemaList: payload }
        default:
            return state;
    }
};