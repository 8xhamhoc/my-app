type Props = {
  name: string;
  role: string;
  isOnline: boolean;
};

export default function UserCard({ name, role, isOnline }: Props) {
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
}
