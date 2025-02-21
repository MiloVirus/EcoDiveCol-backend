const labelsByAchievementId: { [key: string]: string[] } = {
    'achievement1': ['Fish Hook', 'Fish Net', 'Fish Line', 'Net'],
    'achievement2': ['Litter', 'Plastic', 'Trash', 'Beach', 'Bottle', 'Picking up trash', 'People cleaning', 'Beach cleaning'],
    'achievement3': ['Lion Fish', 'Fish', 'Spear', 'Dead Fish'],
    'achievement4': ['Forest', 'Trees', 'Wildlife', 'Nature', 'Hiking'],
    'achievement5': ['Energy', 'Solar', 'Wind', 'Renewable', 'Sustainable']
};

export function getAchievementId(id: string): string[] | undefined {
    switch (id) {
        case '898945ad-7609-4bb8-b95a-2811b9817b22':
            return labelsByAchievementId.achievement1;
        case '30ba1a82-196d-4917-bea1-a7945b6d2ebe':
            return labelsByAchievementId.achievement2;
        case '6e47c302-82c1-45c5-8759-6049201c3d20':
            return labelsByAchievementId.achievement3;
        default:
            return undefined;
    }
}
export default labelsByAchievementId;