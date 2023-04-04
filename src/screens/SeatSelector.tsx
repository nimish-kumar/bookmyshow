import { AppBar, LayoutViewer } from "@components";
import { tw } from "@lib";
import { Button } from "@rneui/themed";
import { IGrpDetails, calculateTotalCost, extractGroupsDetails } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export interface ISeatSelectorProps {
  layout: string;
}
interface ITimingBtnProp {
  time: string;
  type?: "selected" | "default";
  setTimeSlot?: () => void;
}
interface ITimingLayout {
  time: string;
  layout: string;
}
const layout_1 =
  "PREMIUM:A:320:INR:1:N|NORMAL:B:150:INR:2:N||1:H:A000:A0+0:A0+0:1A&H1+30:1A&H2+29:1A&H3+28:1A&H4+27:1A&H5+26:1A&H6+25:1A&H7+24:1A&H8+23:1A&H9+22:1A&H10+21:1A&H11+20:1A&H12+19:1A&H13+18:1A&H14+17:1A&H15+16:1A&H16+15:1A&H17+14:1A&H18+13:1A&H19+12:1A&H20+11:1A&H21+10:1A&H22+9:1A&H23+8:1A&H24+7:1A&H25+6:1A&H26+5:1A&H27+4:1A&H28+3:1A&H29+2:1A&H30+1|2:G:A000:A0+0:A0+0:1A&G1+30:1A&G2+29:1A&G3+28:1A&G4+27:1A&G5+26:1A&G6+25:1A&G7+24:1A&G8+23:1A&G9+22:1A&G10+21:1A&G11+20:1A&G12+19:1A&G13+18:1A&G14+17:1A&G15+16:1A&G16+15:1A&G17+14:1A&G18+13:1A&G19+12:1A&G20+11:1A&G21+10:1A&G22+9:1A&G23+8:1A&G24+7:1A&G25+6:1A&G26+5:1A&G27+4:1A&G28+3:1A&G29+2:1A&G30+1|3:F:A000:A0+0:A0+0:1A&F1+30:1A&F2+29:1A&F3+28:1A&F4+27:1A&F5+26:1A&F6+25:1A&F7+24:1A&F8+23:1A&F9+22:1A&F10+21:1A&F11+20:1A&F12+19:1A&F13+18:1A&F14+17:1A&F15+16:1A&F16+15:1A&F17+14:1A&F18+13:1A&F19+12:1A&F20+11:1A&F21+10:1A&F22+9:1A&F23+8:1A&F24+7:1A&F25+6:1A&F26+5:1A&F27+4:1A&F28+3:1A&F29+2:1A&F30+1|1:E:B000:B0+0:B0+0:1B&E1+30:1B&E2+29:1B&E3+28:1B&E4+27:1B&E5+26:1B&E6+25:1B&E7+24:1B&E8+23:1B&E9+22:1B&E10+21:1B&E11+20:1B&E12+19:1B&E13+18:1B&E14+17:1B&E15+16:1B&E16+15:1B&E17+14:1B&E18+13:1B&E19+12:1B&E20+11:1B&E21+10:1B&E22+9:1B&E23+8:1B&E24+7:1B&E25+6:1B&E26+5:1B&E27+4:1B&E28+3:1B&E29+2:1B&E30+1|2:D:B000:B0+0:B0+0:1B&D1+30:1B&D2+29:1B&D3+28:1B&D4+27:1B&D5+26:1B&D6+25:1B&D7+24:1B&D8+23:1B&D9+22:1B&D10+21:1B&D11+20:1B&D12+19:1B&D13+18:1B&D14+17:1B&D15+16:1B&D16+15:1B&D17+14:1B&D18+13:1B&D19+12:1B&D20+11:1B&D21+10:1B&D22+9:1B&D23+8:1B&D24+7:1B&D25+6:1B&D26+5:1B&D27+4:1B&D28+3:1B&D29+2:1B&D30+1|3:C:B000:B0+0:B0+0:1B&C1+30:1B&C2+29:1B&C3+28:1B&C4+27:1B&C5+26:1B&C6+25:1B&C7+24:1B&C8+23:1B&C9+22:1B&C10+21:1B&C11+20:1B&C12+19:1B&C13+18:1B&C14+17:1B&C15+16:1B&C16+15:1B&C17+14:1B&C18+13:1B&C19+12:1B&C20+11:1B&C21+10:1B&C22+9:1B&C23+8:1B&C24+7:1B&C25+6:1B&C26+5:1B&C27+4:1B&C28+3:1B&C29+2:1B&C30+1|4:B:B000:B0+0:B0+0:1B&B1+30:1B&B2+29:1B&B3+28:1B&B4+27:1B&B5+26:1B&B6+25:1B&B7+24:1B&B8+23:1B&B9+22:1B&B10+21:1B&B11+20:1B&B12+19:1B&B13+18:1B&B14+17:1B&B15+16:1B&B16+15:1B&B17+14:1B&B18+13:1B&B19+12:1B&B20+11:1B&B21+10:1B&B22+9:1B&B23+8:1B&B24+7:1B&B25+6:1B&B26+5:1B&B27+4:1B&B28+3:1B&B29+2:1B&B30+1|5:A:B000:B0+0:B0+0:1B&A1+30:1B&A2+29:1B&A3+28:1B&A4+27:1B&A5+26:1B&A6+25:1B&A7+24:1B&A8+23:1B&A9+22:1B&A10+21:1B&A11+20:1B&A12+19:1B&A13+18:1B&A14+17:1B&A15+16:1B&A16+15:1B&A17+14:1B&A18+13:1B&A19+12:1B&A20+11:1B&A21+10:1B&A22+9:1B&A23+8:1B&A24+7:1B&A25+6:1B&A26+5:1B&A27+4:1B&A28+3:1B&A29+2:1B&A30+1";
const layout_2 =
  "SUPER:A:320:INR:1:N|NORMAL:B:150:INR:2:N||1:H:A000:A0+0:A0+0:1A&H1+30:1A&H2+29:1A&H3+28:1A&H4+27:1A&H5+26:1A&H6+25:1A&H7+24:1A&H8+23:1A&H9+22:1A&H10+21:1A&H11+20:1A&H12+19:1A&H13+18:1A&H14+17:1A&H15+16:1A&H16+15:1A&H17+14:1A&H18+13:1A&H19+12:1A&H20+11:1A&H21+10:1A&H22+9:1A&H23+8:1A&H24+7:1A&H25+6:1A&H26+5:1A&H27+4:1A&H28+3:1A&H29+2:1A&H30+1|2:G:A000:A0+0:A0+0:1A&G1+30:1A&G2+29:1A&G3+28:1A&G4+27:1A&G5+26:1A&G6+25:1A&G7+24:1A&G8+23:1A&G9+22:1A&G10+21:1A&G11+20:1A&G12+19:1A&G13+18:1A&G14+17:1A&G15+16:1A&G16+15:1A&G17+14:1A&G18+13:1A&G19+12:1A&G20+11:1A&G21+10:1A&G22+9:1A&G23+8:1A&G24+7:1A&G25+6:1A&G26+5:1A&G27+4:1A&G28+3:1A&G29+2:1A&G30+1|3:F:A000:A0+0:A0+0:1A&F1+30:1A&F2+29:1A&F3+28:1A&F4+27:1A&F5+26:1A&F6+25:1A&F7+24:1A&F8+23:1A&F9+22:1A&F10+21:1A&F11+20:1A&F12+19:1A&F13+18:1A&F14+17:1A&F15+16:1A&F16+15:1A&F17+14:1A&F18+13:1A&F19+12:1A&F20+11:1A&F21+10:1A&F22+9:1A&F23+8:1A&F24+7:1A&F25+6:1A&F26+5:1A&F27+4:1A&F28+3:1A&F29+2:1A&F30+1|1:E:B000:B0+0:B0+0:1B&E1+30:1B&E2+29:1B&E3+28:1B&E4+27:1B&E5+26:1B&E6+25:1B&E7+24:1B&E8+23:1B&E9+22:1B&E10+21:1B&E11+20:1B&E12+19:1B&E13+18:1B&E14+17:1B&E15+16:1B&E16+15:1B&E17+14:1B&E18+13:1B&E19+12:1B&E20+11:1B&E21+10:1B&E22+9:1B&E23+8:1B&E24+7:1B&E25+6:1B&E26+5:1B&E27+4:1B&E28+3:1B&E29+2:1B&E30+1|2:D:B000:B0+0:B0+0:1B&D1+30:1B&D2+29:1B&D3+28:1B&D4+27:1B&D5+26:1B&D6+25:1B&D7+24:1B&D8+23:1B&D9+22:1B&D10+21:1B&D11+20:1B&D12+19:1B&D13+18:1B&D14+17:1B&D15+16:1B&D16+15:1B&D17+14:1B&D18+13:1B&D19+12:1B&D20+11:1B&D21+10:1B&D22+9:1B&D23+8:1B&D24+7:1B&D25+6:1B&D26+5:1B&D27+4:1B&D28+3:1B&D29+2:1B&D30+1|3:C:B000:B0+0:B0+0:1B&C1+30:1B&C2+29:1B&C3+28:1B&C4+27:1B&C5+26:1B&C6+25:1B&C7+24:1B&C8+23:1B&C9+22:1B&C10+21:1B&C11+20:1B&C12+19:1B&C13+18:1B&C14+17:1B&C15+16:1B&C16+15:1B&C17+14:1B&C18+13:1B&C19+12:1B&C20+11:1B&C21+10:1B&C22+9:1B&C23+8:1B&C24+7:1B&C25+6:1B&C26+5:1B&C27+4:1B&C28+3:1B&C29+2:1B&C30+1|4:B:B000:B0+0:B0+0:1B&B1+30:1B&B2+29:1B&B3+28:1B&B4+27:1B&B5+26:1B&B6+25:1B&B7+24:1B&B8+23:1B&B9+22:1B&B10+21:1B&B11+20:1B&B12+19:1B&B13+18:1B&B14+17:1B&B15+16:1B&B16+15:1B&B17+14:1B&B18+13:1B&B19+12:1B&B20+11:1B&B21+10:1B&B22+9:1B&B23+8:1B&B24+7:1B&B25+6:1B&B26+5:1B&B27+4:1B&B28+3:1B&B29+2:1B&B30+1|5:A:B000:B0+0:B0+0:1B&A1+30:1B&A2+29:1B&A3+28:1B&A4+27:1B&A5+26:1B&A6+25:1B&A7+24:1B&A8+23:1B&A9+22:1B&A10+21:1B&A11+20:1B&A12+19:1B&A13+18:1B&A14+17:1B&A15+16:1B&A16+15:1B&A17+14:1B&A18+13:1B&A19+12:1B&A20+11:1B&A21+10:1B&A22+9:1B&A23+8:1B&A24+7:1B&A25+6:1B&A26+5:1B&A27+4:1B&A28+3:1B&A29+2:1B&A30+1";

const timings: ITimingLayout[] = [
  { time: "02:30 PM", layout: layout_1 },
  { time: "06:00 PM", layout: layout_2 },
];

const TimingBtn = ({ time, setTimeSlot, type = "default" }: ITimingBtnProp) => {
  if (type === "selected")
    return (
      <Button
        buttonStyle={tw`mr-2 h-10 w-28S rounded-md bg-dark-green justify-center`}
        onPress={setTimeSlot}
      >
        <Text style={tw`text-white font-bold text-sm`}>{time}</Text>
      </Button>
    );
  return (
    <Button
      buttonStyle={tw`mr-2 h-10 w-28S rounded-md bg-white justify-center border border-black`}
      onPress={setTimeSlot}
    >
      <Text style={tw`text-dark-green font-bold text-sm`}>{time}</Text>
    </Button>
  );
};

export const SeatSelector = () => {
  const [selectedTimeSlotIdx, setTimeSlotIdx] = useState(0);
  const layout = timings[selectedTimeSlotIdx].layout;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  // Reset selected seats if time slot is changed
  useEffect(() => {
    setSelectedSeats([]);
    setTotalCost(0);
  }, [selectedTimeSlotIdx]);

  // Memoize group details as it will not change
  // unless the layout is changed
  const groupDetailsArray = useMemo(() => {
    const grps = layout.split("||")[0].split("|");
    const grpDetails: IGrpDetails[] = [];
    for (let i = 0; i < grps.length; i++) {
      const grp = extractGroupsDetails(grps[i]);
      if (grp) {
        grpDetails.push(grp);
      }
    }
    return grpDetails;
  }, [layout]);
  useEffect(() => {
    setTotalCost(calculateTotalCost(groupDetailsArray, selectedSeats));
  }, [selectedSeats]);

  return (
    <View style={tw`min-h-full`}>
      <AppBar title="Movie name" subtitle="Viman Nagar" backButton />
      <View style={tw`bg-gray-200 h-25 pl-4`}>
        <Text style={tw`text-sm my-3`}>Tue, 04 Apr</Text>
        <ScrollView horizontal>
          {timings.map((timing, timingIdx) => {
            return (
              <TimingBtn
                time={timing.time}
                key={timingIdx}
                type={
                  selectedTimeSlotIdx === timingIdx ? "selected" : "default"
                }
                setTimeSlot={() => setTimeSlotIdx(timingIdx)}
              />
            );
          })}
        </ScrollView>
      </View>
      <LayoutViewer
        layout={layout}
        selectedSeatChangeHandler={(seat) => {
          setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat)) {
              const seatIndex = prevSelectedSeats.indexOf(seat);
              return [
                ...prevSelectedSeats.slice(0, seatIndex),
                ...prevSelectedSeats.slice(seatIndex + 1),
              ];
            }
            return [...prevSelectedSeats, seat];
          });
        }}
      />
      <View style={tw`z-1 absolute bottom-0 bg-white items-center flex-col`}>
        <View
          style={tw`py-2 flex-row min-w-full justify-around items-center px-8`}
        >
          <View style={tw`flex-row items-center w-1/4`}>
            <View style={tw`bg-gray-200 h-6 w-6 mr-2 rounded-sm`} />
            <Text style={tw`text-xs`}>Sold</Text>
          </View>
          <View style={tw`flex-row items-center w-1/4`}>
            <View
              style={tw`border border-dark-green h-6 w-6 mr-2 rounded-sm`}
            />
            <Text style={tw`text-xs`}>Available</Text>
          </View>
          <View style={tw`flex-row items-center w-1/4`}>
            <View style={tw`bg-dark-green h-6 w-6 mr-2 rounded-sm`} />
            <Text style={tw`text-xs`}>Selected</Text>
          </View>
        </View>
        <View style={tw`min-w-full`}>
          <Button
            buttonStyle={tw`bg-pink rounded-md h-12 items-center justify-center`}
          >
            <Text style={tw`text-white text-base`}>Pay ₹ {totalCost}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
