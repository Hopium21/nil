import type { Hex } from "@nilfoundation/niljs";
import {
  ArrowUpIcon,
  BUTTON_KIND,
  BUTTON_SIZE,
  Button,
  COLORS,
  LabelMedium,
} from "@nilfoundation/ui-kit";
import { useUnit } from "effector-react";
import type { FC } from "react";
import { useStyletron } from "styletron-react";
import { OverflowEllipsis } from "../../../shared";
import { closeApp } from "../../models/base";
import { exportAppFx } from "../../models/exportApp";
import { DownloadAppButton } from "../DownloadAppButton.tsx";
import { RemoveAppButton } from "../RemoveAppButton";

type ContractManagementHeaderProps = {
  address: Hex;
  bytecode: Hex;
  name: string;
  loading?: boolean;
};

export const ContractManagementHeader: FC<ContractManagementHeaderProps> = ({
  address,
  bytecode,
  name,
  loading,
}) => {
  const [css] = useStyletron();
  const isExportingApp = useUnit(exportAppFx.pending);

  return (
    <div
      className={css({
        display: "flex",
        gap: "12px",
        alignItems: "center",
        position: "sticky",
        top: "-1px",
        backgroundColor: COLORS.gray900,
        paddingTop: "16px",
        paddingBottom: "16px",
      })}
    >
      <Button
        overrides={{
          Root: {
            style: {
              paddingLeft: 0,
              paddingRight: 0,
              width: "32px",
              height: "32px",
              flexShrink: 0,
            },
          },
        }}
        disabled={loading}
        kind={BUTTON_KIND.secondary}
        size={BUTTON_SIZE.compact}
        onClick={() => closeApp()}
      >
        <ArrowUpIcon
          size={12}
          className={css({
            transform: "rotate(-90deg)",
          })}
        />
      </Button>
      <LabelMedium color={COLORS.gray50}>{name}</LabelMedium>
      <LabelMedium
        className={css({
          width: "max(calc(100% - 250px), 100px)",
          marginRight: "auto",
        })}
      >
        <OverflowEllipsis charsFromTheEnd={5}>{address}</OverflowEllipsis>
      </LabelMedium>
      <DownloadAppButton disabled={isExportingApp} kind={BUTTON_KIND.secondary} />
      <RemoveAppButton
        disabled={loading}
        address={address}
        bytecode={bytecode}
        kind={BUTTON_KIND.secondary}
      />
    </div>
  );
};
