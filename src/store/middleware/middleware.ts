 
export const middleware = (store: any) => (next: any) => (action: any) => {
    let result = next(action);
    return result;
};