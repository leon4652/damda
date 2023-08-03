package com.b210.damda.domain.friend.repository;

import com.b210.damda.domain.entity.User.User;
import com.b210.damda.domain.entity.User.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<UserFriend, Long> {

    @Query("SELECT u FROM UserFriend u WHERE u.user = :user")
    List<UserFriend> getUserFriendByUser(@Param("user") User user);


    // 유저와 친구의 정보로 친구목록 찾기
    @Query("SELECT u FROM UserFriend u WHERE u.user = :user AND u.friend = :friend")
    UserFriend getUserFriendByUserAndFriend(@Param("user") User user, @Param("friend") User friend);


    @Query("SELECT u FROM UserFriend u WHERE u.friend = :friend AND u.status = :status")
    List<UserFriend> getUserFriendByFriend(@Param("friend") User friend, @Param("status") String status);

}
