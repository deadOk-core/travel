import { memo } from "react";
import { getPosts,  } from "../../../api/posts/posts";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { CardList } from "../../Widgets/CardList/CardList";
import { Loader } from "../../Widgets/Loader/Loader";

const FetchCardListComponent = () => {
    
  const postsList = useQuery({
    queryFn: ()=> getPosts(),
    queryKey: ["posts"]
  }, queryClient)

  switch(postsList.status) {
    case "pending":
      return <Loader/>
    case "success":
      return <CardList cards={postsList.data} />;
    case 'error':
        return <div>
            <span>Произошла ошибка</span>
        </div>
  }
};

export const FetchCardList = memo(FetchCardListComponent);
