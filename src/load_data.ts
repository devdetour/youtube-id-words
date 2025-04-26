export async function loadAllIds(): Promise<any> {
    return loadData('/youtube-id-words/all_ids.json')
}

export async function loadWordsToIds(): Promise<any> {
    return loadData('/youtube-id-words/words_to_ids.json')
}

async function loadData(path: string): Promise<any> {
    const result = await fetch(path)
    return (await result.json())['data']
}