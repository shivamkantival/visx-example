import { User } from "typeDefs/users";

export function getUserId(user: User): string {
  return user.id;
}
export function getUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
export function getUserAvatar(user: User): string {
  return user.avatar;
}
export function getUserEmail(user: User): string {
  return user.email;
}
