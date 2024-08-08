import CheckboxModule from '@/_components/common/modules/CheckboxModule';
import UserFilteringTitleAtom from '../atoms/UserFilteringTitleAtom';
import UserFilteringSubContainer from './UserFilteringSubContainer';

interface UserPlaceFilteringContainerProps {
  // 장소 조회 필요
  places: string[];
  clickedPlace: string[];
  onClickPlace: (place: string[]) => void;
}

const UserPlaceFilteringContainer = ({
  places,
  clickedPlace,
  onClickPlace,
}: UserPlaceFilteringContainerProps) => {
  return (
    <UserFilteringSubContainer>
      <UserFilteringTitleAtom text="장소" />
      <div className="flex w-full flex-col gap-y-1.5">
        {places.map((place, idx) => (
          <CheckboxModule
            option={place}
            isChecked={clickedPlace.includes(place)}
            onClick={() => {
              if (clickedPlace.includes(place)) {
                onClickPlace(clickedPlace.filter((p) => p !== place));
              } else {
                onClickPlace([...clickedPlace, place]);
              }
            }}
            key={`userPlaceFiltering-${place}`}
          />
        ))}
      </div>
    </UserFilteringSubContainer>
  );
};

export default UserPlaceFilteringContainer;
