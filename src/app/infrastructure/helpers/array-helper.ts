export class ArrayHelper {
    static RemoveElement<T>(sourceArray: Array<T>,  elementToRemove: T) {
        let index: number = sourceArray.findIndex((element) => element == elementToRemove);
        if(index >= 0)
            sourceArray.splice(index, 1);
    }

    static RemoveElementByCondition<T>(sourceArray: Array<T>, predicate: (checkedElement: T) => boolean ) {
        let index: number = sourceArray.findIndex(predicate);
        if(index >= 0)
            sourceArray.splice(index, 1);
    }
}