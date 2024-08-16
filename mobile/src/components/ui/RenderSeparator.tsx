import { FunctionComponent } from "react";
import { View } from "react-native";

interface RenderSeparatorProps {
    height: number;
}

export const RenderSeparator: FunctionComponent<RenderSeparatorProps> = ({ height }) => {
    return <View style={{ height }} />;
};