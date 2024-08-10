export function mergeAndDeduplicateArrays<T>(arr1: T[], arr2: T[]): T[] {
    const uniqueSet = new Set<string>();
  
    for (const obj of arr1) {
        uniqueSet.add(JSON.stringify(obj));
    }
  
    for (const obj of arr2) {
        uniqueSet.add(JSON.stringify(obj));
    }
  
    const mergedAndDeduplicatedArray: T[] = Array.from(uniqueSet, (strObj) =>
        JSON.parse(strObj)
    );
  
    return mergedAndDeduplicatedArray;
}