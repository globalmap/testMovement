
export type stateInterf = {
    exampleValue: number
}

// // // EXAMMPLE_TYPE // // //
// export enum SectionIndexType {
//     top3 = -3,
//     top2 = -2,
//     top1 = -1,
//     center = 0,
//     bottom1 = 1,
//     bottom2 = 2,
//     bottom3 = 3,
// }

// export type typeSection = -3 | -2 | -1 | 0 | 1 | 2 | 3;

// export interface ActionType {
//     type: string,
//     payload: any
// }

// export interface sectionInterf {
//     name: string;
//     id: string;
//     index: SectionIndexType;
//     groups: groupRingsInterf[] | [];
//     items: engagementRingInterf[] | bandsRingInterf[] | [];
// }

// export interface activeRing {
//     name: string;
//     ringActive: string;
//     activeColor: colorsType | null,
//     activeCarat: caratsType | null,
//     typeItem: groupMainRing,
//     stepSection: typeSection,
// }
// export type activeStepConfig = 'config' | 'basket';

// export interface stateInterf {
//     readonly listRings: engagementRingInterf[];
//     readonly listBoatRings: bandsRingInterf[];
//     readonly commonParams: {
//         listColors: colorInterf[];
//         listCarats: caratInterf[];
//         listGroup: groupRingsInterf[];
//     };
//     readonly sections: {
//         aboveSection: sectionInterf;
//         mainSection: sectionInterf;
//         belowSection: sectionInterf;
//     };
//     readonly rulesRing: rulesMap,
//     readonly rulesBoatRing: rulesMap,
//     activeListItem: activeRing[],
//     activeSectionInGroup: sectionRing[] | []
//     interfaceInfo: {
//         stepSection: typeSection,
//         stepConfig: activeStepConfig,
//         standartActiveGroup: groupMainRing,
//         ringCount: number,
//         belowRingCount: number,
//         aboveRingCount: number,
//         loadConfig: boolean,
//         saveUrlConfig: string,
//         startThreekit: any,
//         sizeRing: string,
//     };
//     modalInfo: {
//         modalRemove: boolean,
//         modalShare: boolean,
//         modalRemoveRing: boolean;
//         modalSelectAnotherRing: boolean;
//         modalRemoveRingQuestion: boolean;
//         savedItem: any;
//         stepSectionActiveItem:any;
//     };
//     nextButtonFlag: {
//         isAuxiliaryButtonsActive: boolean,
//         isTempMobileActive: boolean;
//         isEngagementChosen: boolean;
//         isActiveType: boolean;
//     }
//     windowWidthMobileFlag:boolean,
// }


// export interface ThreeKitParams {
//     name: string,
//     position: string,
//     colorName: string,
//     position_short: string,
//     directionConfig: string,
//     nameAttribute: string,
//     positionRingThreeKit: number,
// }

// export interface SharedInterfaceInfoParams {
//     aboveRingCount: number;
//     belowRingCount: number;
//     loadConfig: boolean;
//     ringCount: number;
//     saveUrlConfig: string;
//     standartActiveGroup: string;
//     stepConfig: string;
//     stepSection: number;
// }