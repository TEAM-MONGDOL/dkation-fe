import CheckboxModule from '@/_components/common/modules/CheckboxModule';
import UserFilteringTitleAtom from '../atoms/UserFilteringTitleAtom';

interface UserPlaceFilteringContainerProps {
  // 장소 조회 필요
  places: string[];
  clickedPlace: string;
  onClickPlace: (place: string) => void;
}

const UserPlaceFilteringContainer = ({
  places,
  clickedPlace,
  onClickPlace,
}: UserPlaceFilteringContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-y-6 border-t-[0.5px] border-sub-100 px-8 pb-9 pt-7">
      <UserFilteringTitleAtom text="장소" />
      <div className="flex w-full flex-col gap-y-1.5">
        {places.map((place, idx) => (
          <CheckboxModule
            option={place}
            isChecked={clickedPlace === place}
            onClick={() => onClickPlace(place)}
            key={'userPlaceFiltering' + place}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPlaceFilteringContainer;
